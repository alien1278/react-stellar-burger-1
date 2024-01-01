import { useSelector, useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from "prop-types";
import {
  deleteIngredient,
  sortConstructorIngredients,
} from "../../services/ingredientsSlice";
import style from "../burger-constructor/burger-constructor.module.css";
import { IDragItem, IIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../services/hook";
//import { ingredientType } from "../../utils/types";
interface IConstructorElementsProps {
  ingredient: IIngredient;
  id: string;
  index: number;
}

const  ConstructorElements:FC<IConstructorElementsProps> = ({ ingredient, id, index }) => {
  const { name, price, image } = ingredient;

  const { chosenIngredients } = useAppSelector((state) => state.ingredients);

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);


  const onClose = (elem: IIngredient) => {
    const del = chosenIngredients.indexOf(elem);
    dispatch(deleteIngredient(del));
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch(sortConstructorIngredients({ dragIndex, hoverIndex }));
  };

  const [, drop] = useDrop({
    accept: "card",
    hover: (item:IDragItem, monitor:DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

if (!clientOffset) {
    return;
}
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div ref={ref} className={`${style.element}`}>
      <DragIcon  type="primary" />
      <div className={style.constructorElement}>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => onClose(ingredient)}
        />
      </div>
    </div>
  );
}

// ConstructorElements.propTypes = {
//   ingredients: PropTypes.arrayOf(ingredientType),
//   id: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
// };

export default ConstructorElements;
