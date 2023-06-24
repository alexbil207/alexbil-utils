export interface INode<T> {
  value: T;
  next: INode<T> | null;
}
interface ILinkedList<T> {
  add: (value: T) => void;
  pop: () => T | undefined;
  unshift: (value: T) => void;
  shift: () => T | undefined;
  insert: (index: number, value: T) => void;
  remove: (index: number) => void;
  reverse: () => void;
  print: () => void;
}

class Node<T> {
  value: T;
  next: INode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  head: INode<T> | null;
  tail: INode<T> | null;
  length: number;

  constructor(value: T) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }
  private travelToIndex(index: number) {
    let node: INode<T> | null = this.head;
    let counter = 0;
    while (counter !== index) {
      if (node?.next) node = node.next;
      counter++;
    }
    return node;
  }
  private isIndexValid(index: number) {
    if (this.length < index) return false;
    return true;
  }

  add(value: T) {
    const node = new Node(value);
    if (!this.length) {
      this.head = node;
      this.tail = node;
    } else {
      if (!this.tail) return;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  pop() {
    if (!this.length) return;
    const node = this.travelToIndex(this.length - 2);
    if (!node) return;
    const temp = node.next;
    node.next = null;
    this.tail = node;
    this.length--;
    return temp?.value;
  }

  unshift(value: T) {
    if (!this.head) {
      this.add(value);
      return;
    }
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length++;
  }
  shift() {
    if (!this.length) return;

    if (!this.head || !this.head.next) {
      const temp = this.head;
      this.head = null;
      return temp?.value;
    }
    const second = this.head.next;
    const temp = this.head;
    this.head = second;
    return temp.value;
  }

  insert(index: number, value: T) {
    if (!this.isIndexValid(index))
      throw new Error("The index greater than the length of the LinkedList");
    const node = new Node(value);
    if (index === 0) {
      this.shift();
    }
    if (index === this.length) {
      this.pop();
      return;
    }
    const leader = this.travelToIndex(index - 1);
    if (!leader) return;
    node.next = leader.next;
    leader.next = node;
  }

  remove(index: number) {
    if (!this.isIndexValid(index))
      throw new Error("Cannot find index in LinkedList");

    if (index === 0) {
      this.shift();
      return;
    }

    if (index === this.length) {
      this.pop();
      return;
    }
    const leader = this.travelToIndex(index - 1);
    if (!leader) return;
    const follower = leader.next;
    if (!follower) return;
    leader.next = follower.next;
    this.tail = leader;
  }
  reverse() {
    if (!this.head || !this.head.next) return;
    let first = this.head;
    this.tail = this.head;
    let second = first.next;
    while (second) {
      const temp = second.next;
      second.next = first;
      first = second;
      second = temp;
    }
    this.head.next = null;
    this.head = first;
  }

  print() {
    const arr: T[] = [];
    let currValue: INode<T> | null = this.head;
    while (currValue) {
      arr.push(currValue.value);
      currValue = currValue.next;
    }
    console.table(arr);
  }
}
