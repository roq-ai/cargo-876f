import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { freightBrokerValidationSchema } from 'validationSchema/freight-brokers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.freight_broker
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFreightBrokerById();
    case 'PUT':
      return updateFreightBrokerById();
    case 'DELETE':
      return deleteFreightBrokerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFreightBrokerById() {
    const data = await prisma.freight_broker.findFirst(convertQueryToPrismaUtil(req.query, 'freight_broker'));
    return res.status(200).json(data);
  }

  async function updateFreightBrokerById() {
    await freightBrokerValidationSchema.validate(req.body);
    const data = await prisma.freight_broker.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteFreightBrokerById() {
    const data = await prisma.freight_broker.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
