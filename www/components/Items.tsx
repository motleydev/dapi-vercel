import React from "react";
import { Item, useGetItemsQuery } from "../lib/graphql";
import { useStore } from "../store";

type Props = {};

export default function Items({}: Props) {
  const [{ data }] = useGetItemsQuery();

  const [newItem, setNewItem] = React.useState("");

  const { draggedItem, receivingBucket, setDraggingItem, addToBucket } =
    useStore((store) => store);

  const handleOnDrag = (e: any, item: Partial<Item>) => {
    setDraggingItem(item);
  };

  const handleOnDrop = (e: any) => {
    if (receivingBucket) {
      addToBucket();
      setDraggingItem(null);
    } else {
      setDraggingItem(null);
    }
  };

  return (
    <div className="bg-purple-100 rounded-lg p-4 flex flex-wrap gap-y-2">
      <div className="grid grid-cols-12">
        {data?.item.map((item, index) => {
          return (
            <div
              draggable="true"
              onDragStart={(e) => {
                handleOnDrag(e, item);
              }}
              onDragEnd={(e) => {
                handleOnDrop(e);
              }}
              className="border-2 border-purple-300 bg-white p-2 rounded-lg h-12"
              key={index}
            >
              {item?.id}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          className="p-2 rounded-lg focus:outline-purple-400 focus:bg-white bg-transparent outline-2 outline-dashed outline-purple-200"
          placeholder="Add item"
          value={newItem}
          onChange={(e) => {
            e.preventDefault();
            setNewItem(e.target.value);
          }}
        />
        {newItem.length > 0 && (
          <button className="rounded-lg bg-purple-600 p-2 text-white">
            Add Item
          </button>
        )}
      </div>
    </div>
  );
}