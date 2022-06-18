import styled from "styled-components";

const BaseButton = styled.button`
  padding: 1em;
  border-radius: 8px;
  outline: none;
  border: 0;
  cursor: pointer;
  font-weight: 600;
`;

const FilledButton = styled(BaseButton)`
  background-color: #0075ff;
  color: white;
  border: 2px solid transparent;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(239, 239, 239, 0.3);
  }

  &:hover {
    background-color: #0261d1;
  }
`;

const OutlinedButton = styled(BaseButton)`
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:disabled {
    border-color: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  use: "filled" | "outlined";
}

export const Button = ({ use, ref, ...rest }: Props) => {
  const ButtonComponent = use === "filled" ? FilledButton : OutlinedButton;
  return (
    <ButtonComponent
      {...rest}
      ref={typeof ref === "string" ? undefined : ref}
    />
  );
};
