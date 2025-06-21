export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface Artist2 {
  id: string;
  name: string;
  tracklist: string;
  type: string;
}

type UserTopTrackArtistField = Pick<
  ArtistData,
  "id" | "name" | "picture" | "picture_small" | "picture_medium" | "picture_big" | "picture_xl"
>;

type UserTopTrackAlbumField = Pick<
  Album,
  "id" | "title" | "cover" | "cover_small" | "cover_medium" | "cover_big" | "cover_xl"
>;

export interface ArtistData {
  id: string;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: "artist";
}

export interface Album {
  id: string;
  title: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  genres: Genres;
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: Date;
  record_type: string;
  available: boolean;
  tracklist: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  contributors: Contributor[];
  artist: ArtistData;
  type: string;
  tracks: TrackData;
}

export interface Genres {
  data: GenreData[];
}

export interface GenreData {
  id: number;
  name: string;
  picture: string;
  type: string;
}

export interface Contributor {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
  role: string;
}

export interface TrackData {
  id: string;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: string;
  rank: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: UserTopTrackArtistField;
  album: UserTopTrackAlbumField;
  type: string;
}

export interface UserTopPrevTracks {
  data: TrackData[];
  total: number;
  prev: string;
}
export interface UserTopNextTracks {
  data: TrackData[];
  total: number;
  next: string;
}
export interface UserTopNextAndPrevTracks {
  data: TrackData[];
  total: number;
  next: string;
  prev: string;
}
export type UserTopTracks = UserTopPrevTracks | UserTopNextTracks | UserTopNextAndPrevTracks;

export interface UserTopArtist {
  data: ArtistData[];
  total: number;
}

export interface DeezerUserInfo {
  id: string;
  name: string;
  lastname: string;
  firstname: string;
  email: string;
  status: number;
  birthday: string;
  inscription_date: string;
  gender: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  country: string;
  lang: string;
  is_kid: boolean;
  explicit_content_level: string;
  explicit_content_levels_available: string[];
  tracklist: string;
  type: string;
}

export interface AccessDeezerTokenResponse {
  access_token: string;
  expires?: number;
}

export interface DeezerError {
  error: {
    type: string;
    message: string;
    code: number;
  };
}
