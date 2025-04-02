
// Instead of importing from hooks (which likely creates a circular dependency)
// Import directly from the Toast component file
import { useToast, toast } from "@/components/ui/toast";

export { useToast, toast };
