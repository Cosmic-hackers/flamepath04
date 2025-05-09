import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden p-4 mt-16">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Heres_the_updated_prompt_with_a_fire_at_th_2.jpg-HvDEBLPkkPCgp4iTjd1kovt2bjOj4I.jpeg"
          alt="Lighthouse with fire trail"
          fill
          className="object-cover rounded-3xl"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent dark:from-background/60 dark:via-background/30 dark:to-transparent rounded-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 flame-text">
            Ignite Your Tech Career
          </h1>
          <p className="text-xl md:text-2xl text-foreground-light mb-8 dark:text-white">
            Master cutting-edge skills in AI, Cybersecurity, and more
          </p>
          <Button asChild className="flame-button text-lg px-8 py-3">
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
