import React from "react";
import styles from "./ingredient-image.module.css";

interface IIngredientImage {
  src: string;
  renderDiv?: boolean;
  style?: React.CSSProperties;
  remainCount?: number;
}
const IngredientImage = ({
  src,
  renderDiv = false,
  style,
  remainCount,
}: IIngredientImage) => {
  if (renderDiv) {
    return (
      <div style={style} className={styles.ingredient}>
        <img
          style={{ filter: remainCount ? "brightness(40%)" : "" }}
          className={styles.ingredientImage}
          src={src}
          alt="ингредиент"
        />

        {remainCount && (
          <div className={styles.ingredientsCount}>+{remainCount}</div>
        )}
      </div>
    );
  }

  return (
    <li style={style} className={styles.ingredient}>
      <img
        style={{ filter: remainCount ? "brightness(40%)" : "" }}
        className={styles.ingredientImage}
        src={src}
        alt="ингредиент"
      />
      {remainCount && (
        <div className={styles.ingredientsCount}>+{remainCount}</div>
      )}
    </li>
  );
};

export default IngredientImage;
