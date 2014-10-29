# Contributing to BIG Gulp

We welcome your contributions on making BIG Gulp a project that better 
accommodates the needs of the Gulp community.

If you'd like to help contribute, please get in touch.


## Using the issue tracker

The issue tracker is the preferred channel for [bug reports](#bugs),
[features requests](#features) and [submitting pull
requests](#pull-requests). We ask that you think before submitting.


### Releasing a new version

1. Include all new functional changes in the CHANGELOG.
2. Use a dedicated commit to increment the version. The version needs to be
   added to the `CHANGELOG.md` (inc. date) and the `package.json`.
3. The commit message must be of `0.0.0` format.
4. Create an annotated tag for the version: `git tag -m "0.0.0" 0.0.0`.
5. Push the changes and tags to GitHub: `git push --tags origin master`.
6. Publish the new version to npm: `npm publish`.
