import { MovieDescriptionFormatPipe } from './movie-description-format.pipe';

describe('MovieDescriptionFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieDescriptionFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
