import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ManualPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: string, comment: string) => void;
}

export function ManualPaymentModal({ isOpen, onClose, onSubmit }: ManualPaymentModalProps) {
  const [amount, setAmount] = React.useState("");
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setAmount("");
      setComment("");
    }
  }, [isOpen]);

  const isValid = amount.trim().length > 0 && !Number.isNaN(Number(amount)) && Number(amount) > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(amount, comment);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ccc] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[440px] max-h-[85vh] overflow-y-auto z-[10000] outline-none">
          <div className="pt-[24px] px-[24px] pb-px">
            <Dialog.Title className="font-['Roboto_Condensed:Bold',sans-serif] leading-[24px] not-italic text-[#1a1a1a] text-[16px] uppercase">
              Manual payment
            </Dialog.Title>
            <Dialog.Description className="sr-only">Register a manual payment against this customer's credit balance</Dialog.Description>
          </div>

          <div className="p-[24px]">
            <div className="mb-[16px]">
              <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[2px]">
                * Payment amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border h-[32px] px-[10px] text-[14px] font-['Roboto:Regular',sans-serif] outline-none bg-white border-[#ccc] text-[#1a1a1a] focus:border-[#1c7862]"
              />
            </div>
            <div>
              <label className="block font-['Roboto:Regular',sans-serif] text-[14px] leading-[17px] text-[#666] mb-[2px]">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-[#ccc] px-[10px] py-[8px] min-h-[80px] text-[14px] font-['Roboto:Regular',sans-serif] outline-none focus:border-[#1c7862] resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e5e5]">
            <button
              onClick={onClose}
              className="bg-[#eaeaea] h-[30px] px-[16px] rounded-[33554400px] hover:bg-[#e0e0e0] transition-colors"
            >
              <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[#1a1a1a] text-[13px] text-center uppercase">
                Cancel
              </p>
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className="bg-[#1c7862] h-[30px] px-[16px] rounded-[33554400px] border border-[#1c7862] hover:bg-[#248E73] hover:border-[#248E73] disabled:bg-[#ccc] disabled:border-[#ccc] disabled:cursor-not-allowed transition-colors"
            >
              <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic text-[13px] text-center text-white uppercase">
                Register payment
              </p>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
