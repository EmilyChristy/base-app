"use client";

import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/16/solid";

enum ItemType {
  Main = "main",
  Vegetables = "vegetables",
  Potatoes = "potatoes",
  Accompaniments = "accompaniments",
}

// interface CookingPlan {
//   totalTime: number;
//   steps: CookingStep[];
// }

// interface CookingStep {
//   stepNumber: number;
//   time: number;
//   description: string;
//   cookingItem: Item;
// }

interface CookingItem {
  id: number;
  name: string;
  prepTime: number;
  cookingTime: number;
  restingTime: number;
  readonly totalTime: number; // Mark as readonly since it will be calculated
}

// Create a class that implements this interface
class CookingItemImpl implements CookingItem {
  id: number;
  name: string;
  prepTime: number;
  cookingTime: number;
  restingTime: number;
  totalTime: number;

  constructor(data: CookingItem) {
    this.id = data.id;
    this.name = data.name;
    this.prepTime = data.prepTime;
    this.cookingTime = data.cookingTime;
    this.restingTime = data.restingTime;
    this.totalTime = data.totalTime;
  }

  // Define a getter for totalTime
  // get totalTime(): number {
  //   return this.prepTime + this.cookingTime + this.restingTime;
  // }
}

// ----

interface CookingItemSelected extends CookingItem {
  type?: ItemType;
}

// Implementation for the selected item
class CookingItemSelectedImpl
  extends CookingItemImpl
  implements CookingItemSelected
{
  type?: ItemType;

  constructor(data: CookingItemSelected) {
    super(data);
    this.type = data.type;
  }
}

// ---

interface CookingGroup {
  type: ItemType;
  name: string;
  items: CookingItemImpl[];
}

export default function RoastDinnerPlanner() {
  const [selectedItems, setSelectedItems] = useState<CookingItemSelectedImpl[]>(
    []
  );
  const [servings, setServings] = useState<number>(4);
  const [generatedPlan, setGeneratedPlan] = useState<
    CookingItemSelectedImpl[] | null
  >(null);

  const roastItemsGrouped: CookingGroup[] = [
    {
      type: ItemType.Main,
      name: "Mains",
      items: [
        new CookingItemImpl({
          id: 1,
          name: "Roast Chicken",
          prepTime: 15,
          cookingTime: 60,
          restingTime: 10,
          totalTime: 120,
        }),
        new CookingItemImpl({
          id: 2,
          name: "Beef",
          prepTime: 10,
          cookingTime: 120,
          restingTime: 30,
          totalTime: 120,
        }),
        new CookingItemImpl({
          id: 3,
          name: "Lamb",
          prepTime: 15,
          cookingTime: 90,
          restingTime: 30,
          totalTime: 20,
        }),
        new CookingItemImpl({
          id: 4,
          name: "Pork",
          prepTime: 10,
          cookingTime: 120,
          restingTime: 20,
          totalTime: 12,
        }),
      ],
    },
    {
      type: ItemType.Potatoes,
      name: "Potatoes",
      items: [
        new CookingItemImpl({
          id: 4,
          name: "Roast",
          prepTime: 5,
          cookingTime: 60,
          restingTime: 0,
          totalTime: 52,
        }),
        new CookingItemImpl({
          id: 5,
          name: "Dauphinoise",
          prepTime: 15,
          cookingTime: 60,
          restingTime: 0,
          totalTime: 26,
        }),
        new CookingItemImpl({
          id: 6,
          name: "Boiled",
          prepTime: 5,
          cookingTime: 25,
          restingTime: 0,
          totalTime: 19,
        }),
      ],
    },
    {
      type: ItemType.Vegetables,
      name: "Boiled vegetables",
      items: [
        new CookingItemImpl({
          id: 7,
          name: "Carrots",
          prepTime: 5,
          cookingTime: 15,
          restingTime: 0,
          totalTime: 7,
        }),
        new CookingItemImpl({
          id: 8,
          name: "Peas",
          prepTime: 1,
          cookingTime: 10,
          restingTime: 0,
          totalTime: 16,
        }),
      ],
    },
  ];

  //Add the selected item to the list of cooking items
  const handleItemSelect = (id: number, item: CookingItem, type: ItemType) => {
    // debugger;
    const updatedSelection = [...selectedItems];

    //make sure we only add the item to the list once
    const doesAlreadyExist = selectedItems.find(
      (existingItem) => existingItem.id === item.id
    );

    if (doesAlreadyExist == undefined) {
      //add type
      const selected_item: CookingItemSelectedImpl = {
        ...item,
        type: type,
      };
      updatedSelection.push(selected_item);
    }

    setSelectedItems(updatedSelection);
  };

  // Get the list if selected items, order them by totalTime descending and
  // generate the step by step plan
  const generatePlan = () => {
    // Get the list of selected items and sort them by their total time
    debugger;
    const plan = selectedItems.sort(
      (a: CookingItemSelectedImpl, b: CookingItemSelectedImpl) =>
        a.totalTime - b.totalTime
    );

    setGeneratedPlan(plan);
  };

  return (
    <div className="roastdinner  px-0 py-8 border-0 border-cyan-400">
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <h2>Number of Servings</h2>
          <select
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="ml-2 p-2 border rounded-lg"
          >
            {[2, 4, 6, 8].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {roastItemsGrouped.map((roastItemGroup) => (
            <div
              key={roastItemGroup.name}
              className="bg-gray-50 p-4 rounded-xl"
            >
              <h2 className="text-lg mb-3 flex items-center">
                <StarIcon className="mr-1 mb-0.5 size-6 text-blue-500" />
                {roastItemGroup.name}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {roastItemGroup.items.map((cookingItem) => (
                  <button
                    key={cookingItem.id}
                    onClick={() =>
                      handleItemSelect(
                        cookingItem.id,
                        cookingItem,
                        roastItemGroup.type
                      )
                    }
                    className={`p-2 rounded-lg transition-all ${
                      selectedItems.some((s) => s.name === cookingItem.name)
                        ? "bg-blue-500 text-white"
                        : "bg-white border hover:bg-blue-100"
                    }`}
                  >
                    {cookingItem.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <button
          onClick={generatePlan}
          disabled={selectedItems.length === 0}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
        >
          <StarIcon className="size-6 text-blue-500" />
          Generate Cooking Plan
        </button>

        {generatedPlan && (
          <div className="mt-6 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <StarIcon className="size-6 text-blue-500" />
              Cooking Timeline
            </h2>

            <div className="space-y-3">
              {generatedPlan.map((step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h2>
                    {step.name} ({step.type}) - total time {step.totalTime} mins
                  </h2>
                  <p className="font-semibold text-blue-600">
                    Prep time :{step.prepTime} minutes
                  </p>
                  <p className="font-semibold text-blue-600">
                    Cooking time :{step.cookingTime} minutes
                  </p>
                  <p className="font-semibold text-blue-600">
                    Resting time :{step.restingTime} minutes
                  </p>

                  <p>No description yet</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-bold">
                Total Cooking Time:
                {/* {generatedPlan.totalTime} minutes */}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
