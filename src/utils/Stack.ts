import { INode, LinkedList } from "./LinkedList";

interface IStack<T> {
  peek: () => INode<T> | null;
  push: (value: T) => void;
}

export class Stack<T> extends LinkedList<T> implements IStack<T> {
  constructor(value: T) {
    super(value);
  }

  push(value: T) {
    this.add(value);
  }

  peek() {
    return this.head;
  }
}
