import { useRef } from "react";
import {
  editItemName,
  removeItem,
  togglePurchased,
  updateQuantity,
  type Item,
} from "../../slices/shoppingItemsSlice";
import { useStateDispatch } from "../../stores/store";

export const ItemCard = ({ id, name, quantity, wasBought }: Item) => {
  const dispatch = useStateDispatch();
  const editNameRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <section className="itemCard">
        <header>
          <h3>Product Name: {name}</h3>
        </header>
        <p>Added in Date: {id}</p>
        <p>Item was bought: {wasBought ? "true" : "false"}</p>

        <button
          className="itemCard__buyItemCTA"
          onClick={() => dispatch(togglePurchased(id))}
        >
          Buy the Item
        </button>

        <button
          className="itemCard_deleteItem"
          onClick={() => dispatch(removeItem(id))}
        >
          X
        </button>

        <label htmlFor="updateQuantity">Update the quantity of the item</label>
        <input
          type="number"
          value={quantity}
          name="updateQuantity"
          id="updateQuantity"
          onChange={(e) =>
            dispatch(
              updateQuantity({
                id: id,
                quantity: Number(e.currentTarget.value),
              })
            )
          }
        />

        <label htmlFor="editName">Edit Name</label>
        <input ref={editNameRef} type="text" name="editName" id="editName" />
        <button
          onClick={() => {
            if (editNameRef.current?.value) {
              dispatch(
                editItemName({ id: id, name: editNameRef.current.value })
              );
              editNameRef.current.value = "";
            }
          }}
        >
          Edit the name of the item
        </button>
      </section>
    </>
  );
};
