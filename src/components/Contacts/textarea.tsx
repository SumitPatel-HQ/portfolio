"use client"

import * as React from "react"
import { Maximize2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [, setHasOverflow] = React.useState(false)
    const [modalValue, setModalValue] = React.useState("")
    const [charCount, setCharCount] = React.useState(0)
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
      if (internalRef.current) {
        setCharCount(internalRef.current.value.length)
      }
    }, [value, checkOverflow])

    // Check on initial render and potential defaultValue change
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        checkOverflow()
        if (internalRef.current) {
          setCharCount(internalRef.current.value.length)
        }
      }, 50)
      return () => clearTimeout(timeout)
    }, [props.defaultValue, checkOverflow])

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      setCharCount(e.currentTarget.value.length)
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
        <div
          className={cn(
            "relative group flex flex-col w-full min-h-[250px]  md:min-h-[100px]  rounded-lg border border-border-custom bg-background-dark transition-all duration-300 hover:border-white/20 focus-within:ring-1 focus-within:ring-white/20 overflow-hidden",
            className
          )}
        >
          <textarea
            className="no-arrows flex-1 w-full bg-transparent pl-4 md:pl-5 lg:pl-4 pr-2 md:pr-4 lg:pr-2 pt-3 md:pt-3 text-base md:text-lg lg:text-sm leading-[1.6] text-foreground/90 placeholder:text-muted-custom focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 scrollbar-custom overflow-y-auto resize-none"
            ref={internalRef}
            data-lenis-prevent
            value={value}
            onChange={onChange}
            onInput={handleInput}
            maxLength={1000}
            {...props}
          />

          <div className="flex items-center justify-between pl-4 pr-2 pb-2">
            <div className="text-xs text-muted-custom pointer-events-none select-none ml-1">
              {charCount.toLocaleString()} / {props.maxLength || 1000}
            </div>

            <button
              type="button"
              onClick={() => {
                setModalValue(internalRef.current?.value || "")
                setIsExpanded(true)
              }}
              className=" bg-transparent  p-2 md:p-3 lg:p-1 text-muted-custom transition-all duration-200 hover:text-foreground focus:opacity-100"
              aria-label="Expand message view"
              title="Expand message view"
            >
              <Maximize2 className="h-4 w-4 md:h-6 md:w-6 lg:h-[13px] lg:w-[13px]" />
            </button>
          </div>
        </div>


        <AnimatePresence>
          {/* Full-screen Modal Overlay */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/25 md:bg-background/40 backdrop-blur-[1px] md:backdrop-blur-md p-3 md:p-6"
              onClick={() => setIsExpanded(false)}
            >
              {/* Expanded Modal Content Box */}
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 16 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative flex h-[min(80vh,720px)] md:h-[85vh] lg:h-[min(76vh,720px)] w-[95vw] md:w-[95vw] lg:w-full md:max-w-4xl lg:max-w-3xl flex-col overflow-hidden rounded-xl md:rounded-2xl lg:rounded-xl border border-white/4 shadow-2xl bg-background-dark"
                onClick={(e) => e.stopPropagation()}
              >

                <div className="flex items-center justify-between border-b border-white/5 bg-background-secondary/25 px-4 py-2.5 md:px-6 md:py-3 lg:px-5 lg:py-2.5">
                  {/* Modal Header: Label Left, Counter & Close Right */}
                  <span className="text-xs md:text-xs lg:text-sm font-medium uppercase tracking-[0.14em] text-muted-custom/85">
                    Message
                  </span>

                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-xs md:text-sm lg:text-xs text-muted-custom/80 select-none whitespace-nowrap">
                      {modalValue.length.toLocaleString()} / {props.maxLength || 1000} characters
                    </span>
                    <button
                      onClick={() => setIsExpanded(false)}
                      type="button"
                      aria-label="Close modal"
                      className="p-2 rounded-full bg-transparent text-muted-custom hover:text-red-400 hover:bg-red-400/10 cursor-pointer"
                      title="Close"
                    >
                      <X className="h-5 w-5  " />
                    </button>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 p-4 md:p-5 lg:p-4">
                  {/* Expanded Textarea Container */}
                  <textarea
                    className="scrollbar-custom h-full w-full resize-none bg-background/60 px-4 py-4 text-base leading-[1.75] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-custom focus:border-white/20 md:px-6 md:py-6 md:text-xl lg:px-4 lg:py-4 lg:text-base"
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
                    maxLength={props.maxLength || 1000}
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
