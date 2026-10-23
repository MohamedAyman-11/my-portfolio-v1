import en from "@/messages/en.json";

type Widen<T> = T extends string ? string
  : T extends readonly (infer Item)[] ? Widen<Item>[]
    : T extends object ? { [Key in keyof T]: Widen<T[Key]> }
      : T;

export type Messages = Widen<typeof en>;
