"use client";
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useHealthMetricsMutation } from "@/app/hooks/useHealthMetricsMutation";
import { format } from "date-fns";
import { type HealthMetrics } from "@prisma/client";

interface CreateHealthMetricsProps {
  userId: string;
  initialMetrics?: HealthMetrics;
}

type Inputs = {
  weight: string; // 修正ポイント: number -> string
  bodyFat: string; // 修正ポイント: number -> string
  measurementDate: string;
};

const CreateHealthMetrics: React.FC<CreateHealthMetricsProps> = ({
  userId,
  initialMetrics,
}) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      weight: initialMetrics?.weight?.toFixed(1) ?? "", // 修正ポイント: 数値を文字列に変換
      bodyFat: initialMetrics?.bodyFat?.toFixed(2) ?? "", // 修正ポイント: 数値を文字列に変換
      measurementDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const { createHealthMetrics, isLoading } = useHealthMetricsMutation();

  const [isBodyFatDisabled, setIsBodyFatDisabled] = useState(
    initialMetrics?.bodyFat === null || initialMetrics?.bodyFat === undefined,
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!userId) return;
    createHealthMetrics({
      weight: parseFloat(data.weight), // 修正ポイント: 文字列を数値に変換
      bodyFat: !isBodyFatDisabled ? parseFloat(data.bodyFat) || null : null, // 修正ポイント: 文字列を数値に変換
      measurementDate: new Date(data.measurementDate),
    });
  };

  useEffect(() => {
    if (initialMetrics) {
      setValue("weight", initialMetrics.weight?.toString() ?? ""); // 修正ポイント: 数値を文字列に変換
      setValue("bodyFat", initialMetrics.bodyFat?.toFixed(2) ?? ""); // 修正ポイント: 数値を文字列に変換
      setValue("measurementDate", format(new Date(), "yyyy-MM-dd"));
    }
  }, [initialMetrics, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-3">
      <div className="flex space-x-4">
        <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
          <input
            {...register("weight", { required: true })}
            type="number"
            placeholder="体重"
            className="w-full focus:outline-none"
            step="0.1"
          />
          <span className="text-sm text-gray-500">kg</span>
        </div>

        {!isBodyFatDisabled && (
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
            <input
              {...register("bodyFat")}
              type="number"
              placeholder="体脂肪率"
              className="w-full focus:outline-none"
              step="0.01"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        )}

        <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
          <input
            {...register("measurementDate", { required: true })}
            type="date"
            placeholder="計測日"
            className="w-full bg-transparent focus:bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={isBodyFatDisabled}
          onChange={() => {
            setIsBodyFatDisabled(!isBodyFatDisabled);
            setValue("bodyFat", isBodyFatDisabled ? "" : "0");
          }}
          id="bodyFatCheckbox"
          className="hidden"
        />
        <label
          htmlFor="bodyFatCheckbox"
          className="flex cursor-pointer items-center text-sm text-gray-500"
        >
          <span
            className={`mr-2 inline-block h-5 w-5 rounded border border-gray-300 ${
              isBodyFatDisabled ? "bg-blue-500" : "bg-white"
            }`}
          ></span>
          体脂肪率を記録しない
        </label>
      </div>
      <button
        type="submit"
        className="w-full transform rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:scale-95 hover:bg-blue-400"
        disabled={isLoading}
      >
        {isLoading ? "登録中..." : "登録"}
      </button>
    </form>
  );
};

export default CreateHealthMetrics;
