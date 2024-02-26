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
  logoUrl: string;
};

export type TermsOfServiceVersion = {
  id: number;
  versionNumber: number;
  storagePath: string;
  shareUrl: string;
  fileSize: string;
  createdAt: Date;
};

export type TermsOfService = {
  id: number;
  name: string;
  versions: TermsOfServiceVersion[];
  createdAt: Date;
  organization?: Organization | null;
  active?: boolean;
  totalFileSize: number;
  description: string;
};
