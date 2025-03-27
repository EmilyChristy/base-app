"use client";

import React, { useState } from "react";

interface RoastItem {
  id: string;
  name: string;
  options: string[];
}

interface CookingStep {
  time: number;
  description: string;
}

interface CookingPlan {
  totalTime: number;
  steps: CookingStep[];
}

interface SelectedItem {
  category: string;
  item: string;
}

export default function RoastDinnerPlanner() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [servings, setServings] = useState<number>(4);
  const [generatedPlan, setGeneratedPlan] = useState<CookingPlan | null>(null);

  const roastItems: RoastItem[] = [
    {
      id: "meat",
      name: "Roast Meat",
      options: ["Beef", "Chicken", "Lamb", "Pork"],
    },
    {
      id: "potatoes",
      name: "Potatoes",
      options: ["Roast Potatoes", "Mashed Potatoes", "Dauphinoise"],
    },
    {
      id: "vegetables",
      name: "Vegetables",
      options: ["Roasted Carrots", "Broccoli", "Parsnips", "Peas"],
    },
    {
      id: "accompaniments",
      name: "Accompaniments",
      options: ["Yorkshire Pudding", "Gravy", "Stuffing"],
    },
  ];

  const handleItemSelect = (category: string, item: string) => {
    const updatedSelection = [...selectedItems];
    const existingCategoryIndex = updatedSelection.findIndex(
      (s) => s.category === category
    );

    if (existingCategoryIndex !== -1) {
      updatedSelection[existingCategoryIndex] = { category, item };
    } else {
      updatedSelection.push({ category, item });
    }

    setSelectedItems(updatedSelection);
  };

  const generatePlan = () => {
    // Placeholder for plan generation logic
    setGeneratedPlan({
      totalTime: 120,
      steps: [
        { time: 0, description: "Preheat oven to 180°C" },
        { time: 15, description: "Prepare meat and season" },
        { time: 45, description: "Start roasting meat" },
        { time: 60, description: "Prepare vegetables" },
      ],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.768-.231-1.477-.638-2.022M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.768.231-1.477.638-2.022M14 10h2c0 3.866-3.134 7-7 7s-7-3.134-7-7 3.134-7 7-7h2"
            />
          </svg>
          <label className="text-lg font-semibold mr-4">
            Number of Servings
          </label>
          <select
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="p-2 border rounded-lg"
          >
            {[2, 4, 6, 8].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {roastItems.map((category) => (
            <div key={category.id} className="bg-gray-50 p-4 rounded-xl">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {category.name}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {category.options.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleItemSelect(category.id, item)}
                    className={`p-2 rounded-lg transition-all ${
                      selectedItems.some(
                        (s) => s.category === category.id && s.item === item
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Generate Cooking Plan
        </button>

        {generatedPlan && (
          <div className="mt-6 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mr-3 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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
