
export interface MainResponseInterface {
  name: string,
  path: string,
  sha: string,
  size: number,
  git_url: string,
  download_url: string,
  type: string,
  content: string,
  encoding: string,
  _links: {
    self: string,
    git: string,
    html: string
  }
}
export interface ReposResponseInterface {
  url: string,
  repository_url: string,
  labels_url: string,
  comments_url: string,
  events_url: string,
  html_url: string,
  id: number,
  node_id: string,
  number: number,
  title: string,
  user: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  },
  labels: [
    {
      id: number,
      node_id: string,
      url: string,
      name: string,
      color: string,
      default: boolean,
      description: string
    }
  ],
  state: string,
  locked: false,
  assignee: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url:string,
    type: string,
    site_admin: boolean
  },
  assignees: [
    {
      login: string,
      id: number,
      node_id: string,
      avatar_url: string,
      gravatar_id: string,
      url: string,
      html_url: string,
      followers_url: string,
      following_url: string,
      gists_url: string,
      starred_url: string,
      subscriptions_url: string,
      organizations_url: string,
      repos_url: string,
      events_url: string,
      received_events_url: string,
      type: string,
      site_admin: boolean
    }
  ],
  milestone: null,
  comments: number,
  created_at: string,
  updated_at: string,
  closed_at: null,
  author_association: string,
  active_lock_reason: null,
  body: string,
  closed_by: null,
  performed_via_github_app: null
}

export interface ReposMainResponseInterface {
  "name": string,
  "path": string,
  "sha": string,
  "size": number,
  "url": string,
  "html_url": string,
  "git_url": string,
  "download_url": string,
  "type": string,
  "content": string,
  "encoding": string,
  "_links": {
    "self": string,
    "git": string,
    "html": string
  }
}

export interface LinkContentDataInterface {
  isGitHub: boolean,
  isGitHubIssues: boolean,
  isGitHubMain: boolean,
  url: URL | null,
  apiUrl: string,
  response: ReposResponseInterface | MainResponseInterface | null
  responseMani: ReposMainResponseInterface | null
}
