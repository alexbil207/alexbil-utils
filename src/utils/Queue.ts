import { INode, LinkedList } from "./LinkedList";

interface IQueue<T> {
  peek: () => INode<T> | null;
  enqueue: (value: T) => void;
  dequeue: () => T | undefined;
}

export class Queue<T> extends LinkedList<T> implements IQueue<T> {
  constructor(value: T) {
    super(value);
  }

  peek() {
    return this.head;
  }
  enqueue(value: T) {
    this.add(value);
  }
  dequeue() {
    return this.shift();
  }
}
