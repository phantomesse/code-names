/** Variables. */
const WORD_BANK_FILE_NAME = '../data/words.json';

const ROW_WORD_COUNT = 5;
const COLUMN_WORD_COUNT = 5;
const GAME_WORD_COUNT = ROW_WORD_COUNT * COLUMN_WORD_COUNT;

const BLACK_WORD_COUNT = 1;

const Color = {
  BLACK: 'black',
  BLUE: 'blue',
  RED: 'red',
  YELLOW: 'yellow'
};

const View = {
  NORMAL: 'normal',
  SPYMASTER: 'spymaster'
}

/* Export modules for testing. */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    GAME_WORD_COUNT: GAME_WORD_COUNT,
    BLACK_WORD_COUNT: BLACK_WORD_COUNT,
    Color: Color
  };
}
