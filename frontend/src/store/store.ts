import { create } from "zustand";
import { Organization, TermsOfService } from "../app/types";
import { persist } from "zustand/middleware";
import ibm from "ibm-cos-sdk";
interface Credentials {
  token?: string;
  email?: string;
}

interface Store {
  getApiAuthorizationHeader: () => {
    Authorization: string;
  };
  termsOfServices: TermsOfService[];
  organization: Organization | undefined;
  fetchTermsOfService: () => void;
  fetchOrganization: (email: string) => void;
  credentials: Credentials;
  setCredentials: (credentials: Credentials) => void;
}

const createConfig = () => {
  const config = {
    endpoint: process.env.REACT_APP_COS_API_ENDPOINT,
    apiKeyId: process.env.REACT_APP_COS_API_KEY,
    serviceInstanceId: process.env.REACT_APP_COS_API_INSTANCE_ID,
    tokenEndpoint: process.env.REACT_APP_IAM_TOKEN_ENDPOINT,
  };
  return config;
};

const fetchToken = async () => {
  const { apiKeyId, tokenEndpoint } = createConfig();
  const response = await fetch(tokenEndpoint!, {
    method: "POST",
    body: JSON.stringify({
      apiKey: apiKeyId,
      response_type: "cloud_iam",
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { access_token: accessToken } = await response.json();
  return accessToken;
};

const useStore = create(
  persist<Store>(
    (set, get) => ({
      credentials: {
        token: undefined,
        email: undefined,
      },
      termsOfServices: [],
      organization: undefined,
      iamAccessToken: undefined,
      setCredentials: (credentials: Credentials) => set({ credentials }),
      getApiAuthorizationHeader: () => ({
        Authorization: `Token ${get().credentials.token}`,
        "Content-Type": "application/json",
      }),
      fetchTermsOfService: async () => {
        const organizationId = get().organization?.id;
        const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service/${organizationId}`;
        const response = await fetch(endpoint, {
          headers: get().getApiAuthorizationHeader(),
        });

        if (response.status === 200) {
          const termsOfServices = await response.json();
          set({ termsOfServices });
        }
      },
      fetchOrganization: async (email) => {
        const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/organization-from-email/${email}`;
        const response = await fetch(endpoint, {
          headers: get().getApiAuthorizationHeader(),
        });

        if (response.status === 200) {
          const organization = await response.json();
          set({ organization });
        }
      },
    }),
    {
      name: "storeStorage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useStore;
