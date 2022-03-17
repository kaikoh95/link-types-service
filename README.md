# Backend assessment for Linktr.ee

Link Types API service built with node and express.

## Requirements

Requires node 16+

## Installation

```
npm install
```

### Setting .env file:

Run `cp .env.example .env` to create a `.env` file from the `.env.example`.

## Local development

```
npm run start
```

or 

```
npm run start:watch
```

## Notes

Used NodeCache in place of a database for convenience. 

Link to [Database Schema](https://dbdiagram.io/d/62331da10ac038740c4f8a8f), 

or refer to `database-schema-dbdiagram.png`.

`Shows List` and `Music Player` allows multiple creation of 'sub-links' during a single creation.

Allows `url` and `title` to not be passed into Request Body during Link Type creation.

This is because we only need to check their validity when passed in, otherwise they will be empty for `url` and default value based on Link Type for `title`.

Added eslint & prettier.

Added `duration` to `Shows List` as an optional property.

Added `sale finished` to `Shows State` as an additional state if show is not sold out but date is past.

New Link Types can be extended in the `switch-case` in `validLinkTypesPolicy`.

`LinkTypePayload` accepts `T` type for `data` property, which can take the form of any Link Type.

`SupportedPlatforms` now only supports 'spotify', 'apple music' and 'soundcloud' but can be extended.

### TODO

1. Add `docker-compose.yml` and `Dockerfile` to improve dev experience.

2. Add swagger docs to improve dev experience and also allow non-devs to use the API.

3. Add tests for better maintenance of functions.

4. Add authentication (eg JWT or basic auth) to restrict API to only users who are authenticated.

5. Add schema validation based on Link Type to validate/ sanitize unnecessary/additional properties.

6. Add DB persistent storage.

7. Add jsonb validation for `data` of `LinkTypePayload`.

8. Add Redis cache to improve query speed when data is large.

9. Add more advanced filters to only query for an array of specific Link Type.


### Improvements

1. Find a better way to replace `switch-case` in `validLinkTypesPolicy`.

2. Use framework like `LoopBack4` for scaling into a bigger application.

3. Introduce rate limiting to prevent excessive abuse of service.

4. Add semver/ auto version incrementing for versioning of releases.
