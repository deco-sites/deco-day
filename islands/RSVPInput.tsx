import UiButton from "deco-sites/deco-day/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { invoke } from "deco-sites/deco-day/runtime.ts";

interface Props {
  placeholder?: string;
  cta: string;
  successMessage?: string;
  errorMessage?: string;
}

export default function RSVPInput({
  placeholder = "Your work email",
  successMessage = "Done! You'll later receive an e-mail with details.",
  errorMessage = "Ops, there was an error.",
  cta,
}: Props) {
  const email = useSignal("");
  const loading = useSignal(false);
  const feedbackMessage = useSignal("");

  const onRsvp = useCallback(async () => {
    loading.value = true;
    const invokeResponse = await invoke({
      key: "deco-sites/deco-day/actions/submitRsvp.ts",
      props: {
        email: email.value,
      },
    });

    feedbackMessage.value = invokeResponse.ok ? successMessage : errorMessage;
    loading.value = false;
  }, [email.value]);

  return (
    <div class="flex flex-col gap-3">
      <form
        class="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRsvp();
        }}
      >
        <input
          onInput={(e) => (email.value = e.currentTarget.value)}
          value={email.value}
          disabled={loading.value}
          placeholder={placeholder}
          class="input input-bordered w-full rounded-[100px] h-14 flex justify-center items-center placeholder:text-black dark:placeholder:text-white dark:bg-black dark:border-white"
        />
        <UiButton
          type="submit"
          loading={loading.value}
          class="rounded-[100px] font-normal h-14 bg-black text-white dark:text-black dark:bg-white"
        >
          {cta}
        </UiButton>
      </form>
      {feedbackMessage.value && (
        <span class="font-normal">{feedbackMessage.value}</span>
      )}
    </div>
  );
}
