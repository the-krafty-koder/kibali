export type OrganizationUser = {
  id: string;
  email: string;
  firstName: string;
  username: string;
};

export type Organization = {
  id: string;
  user: OrganizationUser;
  bucketName: string;
  phoneNumber: string;
  country: string;
};

export type TermsOfServiceVersion = {
  id: string;
  versionNumber: number;
  storagePath: string;
  url: string;
};

export type TermsOfService = {
  name: string;
  versions: TermsOfServiceVersion[];
  createdAt: string;
  organization?: Organization | null;
};
