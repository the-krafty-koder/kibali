import { create } from "zustand";
import { Organization, TermsOfService } from "../app/types";
import { persist } from "zustand/middleware";

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

const useStore = create(
  persist<Store>(
    (set, get) => ({
      credentials: {
        token: undefined,
        email: undefined,
      },
      termsOfServices: [],
      organization: undefined,
      setCredentials: (credentials: Credentials) => set({ credentials }),
      getApiAuthorizationHeader: () => ({
        Authorization: `Token ${get().credentials.token}`,
        "Content-Type": "application/json",
      }),
      fetchTermsOfService: async () => {
        const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/terms-of-service`;
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
