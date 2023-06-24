interface INode<T> {
  value: T;
  next: INode<T> | null;
  prev: INode<T> | null;
}
interface IDoubleLinkedList<T> {
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
  prev: INode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class DoubleLinkedList<T> implements IDoubleLinkedList<T> {
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
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      if (!this.tail) return;
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
  }
  pop() {
    if (!this.tail) return;
    const temp = this.tail.next;
    const node = this.tail.prev;
    if (!node) return;
    node.next = null;
    this.tail = node;
    return temp?.value;
  }

  unshift(value: T) {
    if (!this.head) {
      this.add(value);
      return;
    }
    const node = new Node(value);
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
    this.length++;
  }

  shift() {
    if (!this.head || !this.head.next) {
      const temp = this.head;
      this.head = null;
      return temp?.value;
    }
    const second = this.head.next;
    second.prev = null;
    const temp = this.head;
    this.head = second;
    return temp.value;
  }

  insert(index: number, value: T) {
    if (!this.isIndexValid(index))
      throw new Error("The index greater than the length of the LinkedList");
    const node: INode<T> | null = new Node(value);
    if (index === 0) {
      this.unshift(value);
      return;
    }

    if (index === this.length) {
      this.add(value);
      return;
    }
    const leader = this.travelToIndex(index - 1);
    if (!leader) return;
    const follower = leader.next;
    if (!follower) return;
    follower.prev = node;
    node.next = follower;
    node.prev = leader;
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
    const node = this.travelToIndex(index);
    const prev = node?.prev;
    const next = node?.next;
    if (!prev || !next) return;
    prev.next = next;
    next.prev = prev;
  }

  reverse() {
    if (!this.head || !this.head.next) return;
    let node: INode<T> | null = this.head;
    let prev = null;
    while (node) {
      const nextNode: INode<T> | null = node.next;
      node.next = prev;
      node.prev = nextNode;
      prev = node;
      node = nextNode;
    }

    // Update the head and tail pointers
    this.tail = this.head;
    this.head = prev;
  }

  print() {
    const arr: unknown[] = [];
    let currValue: INode<T> | null = this.head;
    while (currValue) {
      arr.push(currValue.value);
      currValue = currValue.next;
    }
    console.table(arr);
  }
}
