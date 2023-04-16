import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";

const BudgetCard = (props) => {
  const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max;

    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  };

  const classNames = [];
  if (props.amount > props.max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (props.gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{props.name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(props.amount)}
            {props.max && (
              <span className=" text-muted fs-6 ms-1">
                / {currencyFormatter.format(props.max)}
              </span>
            )}
          </div>
        </Card.Title>
        {props.max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(props.amount, props.max)}
            min={0}
            max={props.max}
            now={props.amount}
          />
        )}
        {!props.hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={props.onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button
              onClick={props.onViewExpensesClick}
              variant="outline-secondary"
            >
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
