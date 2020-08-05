/**
 * The modes.
 */
enum MODES {
  /**
   * Mode foo.
   */
  FOO = 'foo',

  /**
   * Mode bar.
   */
  BAR = 'bar',
}

class Foo {
  mode = MODES.FOO;

  constructor(mode: MODES) {
    this.mode = mode;
  }

  print() {
    switch (this.mode) {
      case MODES.FOO:
        return 'Working for mode foo...';
      case MODES.BAR:
        return 'Working for mode bar...';
    }
  }
}

console.log('Foo:', new Foo(MODES.FOO).print());
console.log('Bar:', new Foo(MODES.BAR).print());
