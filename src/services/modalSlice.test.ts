import { modalSliceReducer, showModal, hideModal } from "./modalSlice";

describe("modalSlice reducer", () => {
  const initialState = {
    name: undefined,
    data: undefined,
  };

  it("должен обрабатывать начальное состояние", () => {
    expect(modalSliceReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен обрабатывать showModal", () => {
    const modalName = "details";
    const modalData = { _id: "1", name: "Ингредиент 1", type: "type1" };
    expect(
      modalSliceReducer(
        initialState,
        showModal({ name: modalName, data: modalData })
      )
    ).toEqual({
      name: modalName,
      data: modalData,
    });
  });

  it("должен обрабатывать hideModal", () => {
    const stateWithModal = {
      name: "order",
      data: { _id: "2", name: "Ингредиент 2", type: "type2" },
    };
    expect(modalSliceReducer(stateWithModal, hideModal())).toEqual(
      initialState
    );
  });
});
