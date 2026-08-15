import { CertificationForm } from "@/components/admin/forms/certification-form";
import { createCertification } from "@/lib/actions/certifications";

export default function NewCertificationPage() {
  return (
    <div>
      <h1 className="text-h2 font-display uppercase">Add certification</h1>
      <div className="mt-8">
        <CertificationForm action={createCertification} />
      </div>
    </div>
  );
}