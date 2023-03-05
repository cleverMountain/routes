import { IMenu } from "../type/types"

interface IObj {
  [propName: string]: IMenu;
}



export const treeDataHandle = (data: Array<IMenu>): Array<IMenu> => {
  let newObj: IObj = {};
  data.forEach((item: IMenu) => {
    newObj[item.id] = item;
  });
  return data.reduce<IMenu[]>((pre, cur) => {
    let pid = cur.parentId;
    let parent = newObj[pid];
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur]);
    } else if (pid === 0) {
      pre.push(cur);
    }
    return pre;
  }, []) as IMenu[];
};