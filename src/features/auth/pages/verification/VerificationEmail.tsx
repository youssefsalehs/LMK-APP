import VerifyForm from "../../components/verifyForm/VerifyForm";
import useVerifyRegistration from "../../hooks/useVerifyRegistration";
export default function VerificationEmail() {
  const { mutate, isPending } = useVerifyRegistration();
  return (
    <div>
      <VerifyForm mutate={mutate} isPending={isPending} />
    </div>
  );
}
