import { FC, useCallback } from "react";

export enum PAGE_DIRECTION {
  INCREMENT = "inc",
  DECREMENT = "dec",
}

export type PageTarget = number | PAGE_DIRECTION;

interface PageButtonProps {
  onClick: (
    target: PageTarget,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  pageTarget: PageTarget;
  selected?: boolean;
  disabled?: boolean;
}

const PageButton: FC<PageButtonProps> = ({
  onClick,
  pageTarget,
  selected,
  disabled,
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      !disabled && onClick(pageTarget, e);
    },
    [onClick, pageTarget, disabled]
  );

  const renderValue = (target: PageTarget) => {
    switch (target) {
      case PAGE_DIRECTION.INCREMENT:
        return ">";
      case PAGE_DIRECTION.DECREMENT:
        return "<";
      default:
        return target.toString();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`table-pagination-btn semi-bold ${
        selected ? "selected" : ""
      } ${disabled ? "disabled" : ""}`}
    >
      {renderValue(pageTarget)}
    </div>
  );
};

export default PageButton;
