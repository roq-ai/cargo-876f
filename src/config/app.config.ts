interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Truck Driver'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Truck Driver', 'Shipper', 'Freight Broker'],
  tenantName: 'Freight Broker',
  applicationName: 'Cargo',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
