const mapping: Record<string, string> = {
  'freight-brokers': 'freight_broker',
  offers: 'offer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
