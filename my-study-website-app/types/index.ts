import { Session, User } from "next-auth";

export type userSignUpInfo = {
  email: string,
  name: string,
  avatarUrl: string
}

export type userBasicInfo = {
  id: string
  name: string
  email: string
  avatarUrl: string
}

export type Provider = {
    id: string
    name: string
    type: string
    signinUrl: string
    callbackUrl: string
    signinUrlParams?: Record<string, string> | null
}

export type Providers = Record<string, Provider>

export interface SessionInterface extends Session{
    user: User & userBasicInfo
}

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: userBasicInfo;
}
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}