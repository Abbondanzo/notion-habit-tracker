import { Checkbox, Grid } from "semantic-ui-react";
import styled from "styled-components";

interface Props {
  title: string;
  emoji: string;
  checked: boolean;
  onToggle(checked: boolean): void;
}

const Title = styled.h2`
  font-size: calc(10px + 2vmin);
`;

const Emoji = styled.p`
  font-size: calc(10px + 5vmin);
`;

export const CheckboxColumn = ({ title, emoji, checked, onToggle }: Props) => {
  return (
    <Grid.Column>
      <Title>{title}</Title>
      <Emoji>{emoji}</Emoji>
      <Checkbox checked={checked} onChange={() => onToggle(!checked)} />
    </Grid.Column>
  );
};

CheckboxColumn.displayName = "CheckboxColumn";
