interface IMenu {
  createTime: string;
  hidden: number;
  icon: string;
  level: number;
  name: string;
  parentId: number;
  sort: number;
  title: string;
  id: number;
  path?: string,
  component?: () => {}
  children?: Array<IMenu>;
}

export { IMenu }