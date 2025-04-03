"use client";

import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/16/solid";
// interface RoastItem {
//   id: string;
//   name: string;
//   options: string[];
// }

interface CookingPlan {
  totalTime: number;
  steps: CookingStep[];
}

interface CookingStep {
  stepNumber: number;
  time: number;
  description: string;
  cookingItem: Item;
}

interface Item {
  id: number;
  type: string;
  name: string;
  prepTime: number;
  cookingTime: number;
  restingTime: number;
  options: string[];
}

interface SelectedItem {
  id: number;
  // category: string;
  item: string;
}

export default function RoastDinnerPlanner() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [servings, setServings] = useState<number>(4);
  const [generatedPlan, setGeneratedPlan] = useState<CookingPlan | null>(null);

  const roastItems: Item[] = [
    {
      id: 1,
      type: "meat",
      name: "Roast Meat",
      prepTime: 12,
      cookingTime: 20,
      restingTime: 0,
      options: ["Beef", "Chicken", "Lamb", "Pork"],
    },
    {
      id: 2,
      type: "potatoes",
      name: "Potatoes",
      prepTime: 12,
      cookingTime: 20,
      restingTime: 0,
      options: ["Roast Potatoes", "Mashed Potatoes", "Dauphinoise"],
    },
    {
      id: 3,
      type: "vegetables",
      name: "Vegetables",
      prepTime: 12,
      cookingTime: 20,
      restingTime: 0,
      options: ["Roasted Carrots", "Broccoli", "Parsnips", "Peas"],
    },
    {
      id: 4,
      type: "accompaniments",
      name: "Accompaniments",
      prepTime: 12,
      cookingTime: 20,
      restingTime: 0,
      options: ["Yorkshire Pudding", "Gravy", "Stuffing"],
    },
  ];

  //Add the selected item to the list of cooking items
  const handleItemSelect = (id: number, item: string) => {
    debugger;
    const updatedSelection = [...selectedItems];
    updatedSelection.push({ id, item });

    // const existingCategoryIndex = updatedSelection.findIndex(
    //   (s) => s.id === id
    // );

    // if (existingCategoryIndex !== -1) {
    //   updatedSelection[existingCategoryIndex] = { id, item };
    // } else {
    //   updatedSelection.push({ id, item });
    // }

    setSelectedItems(updatedSelection);
  };

  // Get the list if selected items, order them by totalTime descending and
  // generate the step by step plan
  const generatePlan = () => {
    // Get the list of selected items and sort them by their total time

    console.log(selectedItems, "Selected items");

    // setGeneratedPlan({
    //   totalTime: 120,
    //   steps: [
    //     { stepNumber: 1, time: 0, description: "Preheat oven to 180°C", cookingItem:[]] },
    //     { stepNumber: 2, time: 15, description: "Prepare meat and season" },
    //     { stepNumber: 3, time: 45, description: "Start roasting meat" },
    //     { stepNumber: 4, time: 60, description: "Prepare vegetables" },
    //   ],
    // });
  };

  return (
    <div className="roastdinner  px-0 py-8 border-2 border-cyan-400">
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
          {roastItems.map((roastItem) => (
            <div key={roastItem.id} className="bg-gray-50 p-4 rounded-xl">
              <h2 className="text-lg mb-3 flex items-center">
                <StarIcon className="mr-1 mb-0.5 size-6 text-blue-500" />
                {roastItem.name}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {roastItem.options.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleItemSelect(roastItem.id, item)}
                    className={`p-2 rounded-lg transition-all ${
                      selectedItems.some(
                        (s) => s.id === roastItem.id && s.item === item
                      )
                        ? "bg-blue-500 text-white"
                        : "bg-white border hover:bg-blue-100"
                    }`}
                  >
                    {item}
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
              {generatedPlan.steps.map((step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-blue-600">
                    {step.time} minutes
                  </p>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-bold">
                Total Cooking Time: {generatedPlan.totalTime} minutes
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
