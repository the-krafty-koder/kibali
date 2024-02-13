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
  id: number;
  versionNumber: number;
  storagePath: string;
  url: string;
};

export type TermsOfService = {
  id: number;
  name: string;
  versions: TermsOfServiceVersion[];
  createdAt: string;
  organization?: Organization | null;
  active?: boolean;
};
