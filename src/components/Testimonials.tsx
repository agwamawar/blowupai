
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const testimonials = [
    {
      name: "Fatima Al-Zahrani",
      role: "Content Creator",
      text: "The AI insights helped me increase my engagement by 150%",
    },
    {
      name: "Jessica Thompson",
      role: "Marketing Director",
      text: "Game-changing analytics for our video strategy",
    },
    {
      name: "Oluwaseun Adebayo",
      role: "Social Media Manager",
      text: "The predictions are incredibly accurate",
    },
    {
      name: "Dimitris Papadopoulos",
      role: "Digital Storyteller",
      text: "This platform transformed my content planning approach",
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Proof It Works</h2>
      <Carousel className="max-w-xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name}>
              <Card>
                <CardContent className="p-6">
                  <p className="text-lg mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
