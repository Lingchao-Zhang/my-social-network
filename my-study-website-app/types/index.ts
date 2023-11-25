import { Session, User } from "next-auth";
import { MouseEventHandler } from "react";

export type userSignUpInfo = {
  email: string;
  name: string;
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

export type projectFormType = {
  type: string;
  session: SessionInterface
}

export type FormFieldType = {
  title: string;
  state: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
}

export type CustomMenuType = {
  title: string;
  state: string;
  filters: string[];
  setState: (value: string) => void
}

export type CustomButtonType = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting: boolean;
  bgColor?: string;
  textColor?: string;
}

export type ProjectSearch = {
  projectSearch: {
    edges: {node: ProjectInterface} [];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    }
  }
}

export type ProjectCardType = {
  id: string;
  image: string;
  title: string;
  userId: string;
  userName: string;
  avatarUrl: string;
}

export type RelatedProjectType = {
  userId: string;
  projectId: string;
}
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

export interface ProjectFormInfo {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
}


