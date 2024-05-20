import { FormControl } from "@/components/ui/form";

import { Suspense } from "react";
import GridLoader from "@/components/icons/grid";
import { getGroups } from "@/app/actions/staff/user.actions";
import AlertError from "@/components/common/error";
import { groupToOptions } from "@/utils/utils";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { CommonCombobox } from "@/components/comments/combobox";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  onChange: (options: Option[]) => void;
  value: Option[];
  label: string;
  year: string;
};

export async function MultiGroupSelector({
  onChange,
  value,
  year,
  label,
}: Props) {
  const { data, status, error } = await getGroups(year);
  const options = groupToOptions(data.groups);
  if (status !== 200) {
    return <div>Something went wrong</div>;
  }
  if (error) {
    return <AlertError error={error} />;
  }
  return (
    <Suspense fallback={<GridLoader />}>
      <FormControl>
        <MultipleSelector
          aria-label="Select groups"
          className="z-10"
          value={value}
          onChange={onChange}
          placeholder={label}
          options={options}
          defaultOptions={options}
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
      </FormControl>
    </Suspense>
  );
}

type SingleGroupSelectorProps = {
  label: string;
  field: ControllerRenderProps<FieldValues, string>;
  setUpdatedValue: (key: string, value: string) => void;
  fieldKey: string;
  year: string;
};

export async function SingleGroupSelector({
  field,
  setUpdatedValue,
  year,
  label,
  fieldKey,
}: SingleGroupSelectorProps) {
  const { data, status, error } = await getGroups(year);
  const options = groupToOptions(data.groups);
  if (status !== 200) {
    return <div>Something went wrong</div>;
  }
  if (error) {
    return <AlertError error={error} />;
  }
  return (
    <Suspense fallback={<GridLoader />}>
      <FormControl>
        <CommonCombobox
          options={options}
          field={field}
          setUpdatedValue={setUpdatedValue}
          fieldKey={fieldKey}
        />
      </FormControl>
    </Suspense>
  );
}
