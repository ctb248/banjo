import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { formatDate } from "../../utils";

export type PriorityLevel = "High" | "Medium" | "Low";

export interface Order {
  teamMember: string;
  priority: PriorityLevel;
  team: string;
  number: number;
  dueDate: string;
}

const getOrders = (n: number = 250) => {
  const orders: Order[] = [];

  for (let i = 0; i < n; i++) {
    orders.push({
      teamMember: faker.name.fullName(),
      priority: faker.helpers.arrayElement(["High", "Medium", "Low"]),
      team: faker.color.human(),
      number: Math.floor(Math.random() * 999999),
      dueDate: formatDate(faker.date.future()),
    });
  }

  return orders;
};

const useOrders = (
  n?: number
): [Order[], Dispatch<SetStateAction<Order[]>>] => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders(n));
  }, [n]);

  return [orders, setOrders];
};

export default useOrders;
