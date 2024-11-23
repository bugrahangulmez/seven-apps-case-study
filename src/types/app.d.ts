interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface FetchResponse {
  characters: Character[];
  info: Info;
}

interface Info {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}
