import { useEffect, useRef, type FormEvent } from "react";
import {
  addItem,
  getItemsFromLS,
  getState,
  setItemsToLS,
  type Item,
} from "../../slices/shoppingItemsSlice";
import { useStateDispatch, useStateSelector } from "../../stores/store";
import { ItemCard } from "./ItemCard";

export const ShoppingList = () => {
  const { items, loadingStatus, uploadingStatus } = useStateSelector(getState);
  const dispatch = useStateDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  // gestione caricamento
  useEffect(() => {
    console.log("useeffect");
    if (items.length === 0 && loadingStatus === "idle") {
      dispatch(getItemsFromLS());
    }
  }, [loadingStatus, items]);

  // gestione upload
  useEffect(() => {
    if (uploadingStatus === "idle" && items.length > 0) {
      dispatch(setItemsToLS());
    }
  }, [uploadingStatus, items]);

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (nameRef.current?.value && quantityRef.current?.value) {
      const item: Item = {
        id: Date(),
        name: nameRef.current.value,
        quantity: Number(quantityRef.current.value),
        wasBought: false,
      };
      dispatch(addItem(item));
      nameRef.current.value = "";
      quantityRef.current.value = "";
      quantityRef.current.blur();
    }
  };

  return (
    <>
      <header>
        <h1>Items Storage Practice</h1>
      </header>
      <div className="shoppingList__container">
        <main>
          <section className="shoppingList__list">
            <header>
              <h2>Items List</h2>
            </header>

            <div className="itemCards__container">
              Loading Status: {loadingStatus} <br />
              Uploading Status: {uploadingStatus} <br />
              {loadingStatus === "pending" && <p>Loading . . . . </p>}
              {loadingStatus === "fulfilled" ||
                (loadingStatus === "rejected" &&
                  items.map((item) => (
                    <ItemCard
                      key={item.id + Math.random() * 500}
                      id={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      wasBought={item.wasBought}
                    ></ItemCard>
                  )))}
            </div>
          </section>

          <section className="shoppingList__add">
            <header>
              <h2>Insert a new Item</h2>
            </header>
            <form onSubmit={handleAddSubmit}>
              <label htmlFor="itemName">Item Name</label>
              <input ref={nameRef} type="text" name="itemName" id="itemName" />
              <label htmlFor="itemQuantity">Item Quantity</label>
              <input
                ref={quantityRef}
                type="number"
                name="itemQuantity"
                id="itemQuantity"
              />
              <input type="submit" />
            </form>
          </section>
        </main>
      </div>
    </>
  );
};
