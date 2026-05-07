"use client"

import * as React from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [hasOverflow, setHasOverflow] = React.useState(false)
    const [modalValue, setModalValue] = React.useState("")
    const internalRef = React.useRef<HTMLTextAreaElement>(null)

    // Merge refs to allow both internal and external access
    React.useImperativeHandle(ref, () => internalRef.current!)

    const checkOverflow = React.useCallback(() => {
      const el = internalRef.current
      if (el) {
        setHasOverflow(el.scrollHeight > el.clientHeight)
      }
    }, [])

    React.useEffect(() => {
      checkOverflow()
      window.addEventListener("resize", checkOverflow)
      return () => window.removeEventListener("resize", checkOverflow)
    }, [checkOverflow])

    // Check on value change (for controlled components)
    React.useEffect(() => {
      checkOverflow()
    }, [value, checkOverflow])

    // Check on initial render and potential defaultValue change
    React.useEffect(() => {
      const timeout = setTimeout(checkOverflow, 50)
      return () => clearTimeout(timeout)
    }, [props.defaultValue, checkOverflow])

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      checkOverflow()
      const onInput = props.onInput as React.FormEventHandler<HTMLTextAreaElement> | undefined
      onInput?.(e)
    }

    // Handle ESC key to close without bubbling to parent dialogs
    React.useEffect(() => {
      if (!isExpanded) return
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          e.stopPropagation()
          if ("stopImmediatePropagation" in e) {
            e.stopImmediatePropagation()
          }
          setIsExpanded(false)
        }
      }
      document.addEventListener("keydown", handleEsc, true)
      return () => document.removeEventListener("keydown", handleEsc, true)
    }, [isExpanded])

    React.useEffect(() => {
      if (typeof document === "undefined") return
      if (isExpanded) {
        document.body.dataset.contactTextareaExpanded = "true"
      } else {
        delete document.body.dataset.contactTextareaExpanded
      }
      return () => {
        delete document.body.dataset.contactTextareaExpanded
      }
    }, [isExpanded])

    return (
      <>
        {/* Main Textarea Container Box */}
        <div className="relative group w-full">
          <textarea
            className={cn(
              "no-arrows flex min-h-[80px] w-full rounded-xl border border-border-custom bg-background-dark px-3 py-2 text-sm leading-[1.6] text-foreground placeholder:text-muted-custom focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 scrollbar-custom overflow-y-auto transition-all duration-300 hover:border-white/20",
              className
            )}
            ref={internalRef}
            data-lenis-prevent
            value={value}
            onChange={onChange}
            onInput={handleInput}
            maxLength={1000}
            {...props}
          />

          {hasOverflow && (
            <button
              type="button"
              onClick={() => {
                setModalValue(internalRef.current?.value || "")
                setIsExpanded(true)
              }}
              className="absolute bottom-3 right-4 z-10 rounded-lg border border-border-custom bg-background-dark/90 p-1.5 text-muted-custom shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-foreground focus:opacity-100 group-hover:opacity-100"
              aria-label="Expand message view"
              title="Expand message view"
            >
              <Maximize2 size={14} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {/* Full-screen Modal Overlay */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/25 backdrop-blur-[1px] p-3 md:p-8"
              onClick={() => setIsExpanded(false)}
            >
              {/* Expanded Modal Content Box */}
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 16 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative flex h-[min(76vh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-background-dark"
                onClick={(e) => e.stopPropagation()}
              >
                
                <div className="flex min-h-16 items-center justify-between border-b border-white/10 bg-background-secondary/45 px-4 py-3 md:px-5">
                  {/* Modal Header & Character Count */}
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-custom">
                      Message
                    </p>
                    <p className="mt-1 text-sm text-foreground/80">
                      {modalValue.length.toLocaleString()} / 1,000 characters
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="group inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-background-dark text-foreground transition-all duration-200 hover:border-white/30"
                    aria-label="Collapse message view"
                    title="Close and return"
                  >
                    <Minimize2 size={18} />
                  </button>
                </div>

                <div className="flex min-h-0 flex-1 p-4 md:p-5">
                  {/* Expanded Textarea Container */}
                  <textarea
                    className="scrollbar-custom h-full w-full resize-none rounded-xl border border-white/10 bg-background/60 px-4 py-4 text-base leading-[1.75] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-custom focus:border-white/20 md:px-5 md:py-5 md:text-lg"
                    data-lenis-prevent
                    value={modalValue}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setModalValue(e.target.value)
                      // Sync back to the main textarea
                      if (internalRef.current) {
                        internalRef.current.value = e.target.value
                        // Trigger input event for parent listeners
                        const event = new Event("input", { bubbles: true })
                        internalRef.current.dispatchEvent(event)
                      }
                      onChange?.(e)
                    }}
                    placeholder={props.placeholder}
                    autoFocus
                    wrap="soft"
                    maxLength={1000}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
