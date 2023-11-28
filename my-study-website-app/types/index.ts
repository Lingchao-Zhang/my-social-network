import { MouseEventHandler } from "react";

export type userSignUpInfo = {
  email: string;
  name: string;
  avatarUrl: string
}

export type userInfo = {
  id: string
  name: string
  email: string
  avatarUrl: string
}

export type projectFormType = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface
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
  isSubmitting?: boolean;
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

export type ParamsType = {
  params: { id: string };
  searchParams: { session: string}
}

export type ProjectCardType = {
  id: string;
  image: string;
  title: string;
  userId: string;
  userName: string;
  avatarUrl: string;
  currentUser: SessionInterface
}

export type RelatedProjectType = {
  userId: string;
  projectId: string;
  userSession: SessionInterface
}

export type ProjectActionsType = {
  projectId: string;
  currentUser: SessionInterface
}

export type HomeSearchParamsType = {
  searchParams: {
    session: string,
    category?: string,
    endCursor?: string
  }
}

export type PaginationType = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type ProfilePageType = {
  user: UserProfile,
  currentUser: SessionInterface
}
export interface SessionInterface{
    user: userInfo
}

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: userInfo;
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


