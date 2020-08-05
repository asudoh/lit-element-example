/**
 * A personal data.
 */
interface PropertiesHash {
  /**
   * An ID.
   */
  id: string;

  /**
   * Your name.
   */
  name: string;

  /**
   * Your age.
   */
  age: number;
}

function foo(arg: PropertiesHash) {
  // arg.id++;
  return `${arg.id}/${arg.name}/${arg.age}`;
}

export default foo;
