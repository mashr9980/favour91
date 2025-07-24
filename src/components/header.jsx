"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  Loader2,
  LogOut,
  User,
  FileText,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FaUnlockAlt, FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getAuthCookies, getCurrentUser, logoutUser } from "@/lib/auth";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAssetsOpen, setIsAssetsOpen] = useState(false);
  const [isAssetsDropdownOpen, setIsAssetsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      setLoadingAuth(true);
      const { token } = getAuthCookies();
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          await logoutUser(token);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoadingAuth(false);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    setLoadingAuth(true);
    const { token } = getAuthCookies();
    await logoutUser(token);
    setIsAuthenticated(false);
    setUser(null);
    setLoadingAuth(false);
    router.push("/");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight flex items-center font-plus-jakarta-sans"
              prefetch={false}
            >
              VENDR{" "}
              <span className="text-primary ml-1 gradient-text">OS</span>
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>

            <div
              onMouseEnter={() => setIsAssetsDropdownOpen(true)}
              onMouseLeave={() => setIsAssetsDropdownOpen(false)}
              className="relative"
            >
              <DropdownMenu
                open={isAssetsDropdownOpen}
                onOpenChange={setIsAssetsDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="flex items-center text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    Assets{" "}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        isAssetsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-2 glass-effect">
                  <DropdownMenuItem className="p-0">
                    <Link
                      href="/assets/procurement-inbox"
                      className="block w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                      prefetch={false}
                    >
                      <div className="font-semibold">Procurement Inbox</div>
                      <div className="text-xs text-muted-foreground">
                        Weekly bids and opportunities
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0">
                    <Link
                      href="/assets/contract-execution-suite"
                      className="block w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                      prefetch={false}
                    >
                      <div className="font-semibold">Contract Execution Suite</div>
                      <div className="text-xs text-muted-foreground">
                        Proposal tools and tracking
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0">
                    <Link
                      href="/assets/vendr-os-premium"
                      className="block w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                      prefetch={false}
                    >
                      <div className="font-semibold">VENDR OS Premium</div>
                      <div className="text-xs text-muted-foreground">
                        Advanced AI and CRM tools
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {!user?.tier && <NavLink href="/pricing">Pricing</NavLink>}
            <NavLink href="/contact">Contact</NavLink>

            {isAuthenticated && user?.tier && (
              <NavLink href="/content" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                My Content
              </NavLink>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {loadingAuth ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center space-x-2 hover:bg-primary/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{user?.username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-effect">
                  <DropdownMenuItem disabled className="opacity-100">
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  {user?.tier && (
                    <DropdownMenuItem>
                      <Link href="/content" className="flex items-center w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        My Content
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  asChild
                  className="hover:bg-primary/10"
                >
                  <Link href="/login">
                    <FaUnlockAlt className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="purple-button">
                  <Link href="/register">
                    <FaUserPlus className="mr-2 h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </div>
            )}

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-primary/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-xs bg-background border-l border-border"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <Link
                      href="/"
                      className="text-xl font-bold flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      VENDR{" "}
                      <span className="text-primary ml-1 gradient-text">OS</span>
                    </Link>
                  </div>

                  <nav className="flex flex-col space-y-2 flex-1">
                    <MobileNavLink
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </MobileNavLink>

                    <Collapsible
                      open={isAssetsOpen}
                      onOpenChange={setIsAssetsOpen}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-base font-medium hover:bg-primary/10 rounded-lg transition-colors">
                        Assets{" "}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isAssetsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-4 mt-2 space-y-2">
                        <MobileNavLink
                          href="/assets/procurement-inbox"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Procurement Inbox
                        </MobileNavLink>
                        <MobileNavLink
                          href="/assets/contract-execution-suite"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Contract Execution Suite
                        </MobileNavLink>
                        <MobileNavLink
                          href="/assets/vendr-os-premium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          VENDR OS Premium
                        </MobileNavLink>
                      </CollapsibleContent>
                    </Collapsible>

                    {!user?.tier && (
                      <MobileNavLink
                        href="/pricing"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Pricing
                      </MobileNavLink>
                    )}

                    <MobileNavLink
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </MobileNavLink>

                    {isAuthenticated && user?.tier && (
                      <MobileNavLink
                        href="/content"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        My Content
                      </MobileNavLink>
                    )}
                  </nav>

                  <div className="mt-auto border-t border-border pt-4">
                    {loadingAuth ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading...
                      </div>
                    ) : isAuthenticated ? (
                      <div className="space-y-2">
                        <div className="px-4 py-2 text-sm">
                          <div className="font-medium">{user?.username}</div>
                          <div className="text-muted-foreground text-xs">
                            {user?.email}
                          </div>
                        </div>
                        <MobileNavLink
                          href="#"
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </MobileNavLink>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <MobileNavLink
                          href="/login"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <FaUnlockAlt className="mr-2 h-4 w-4" />
                          Login
                        </MobileNavLink>
                        <MobileNavLink
                          href="/register"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <FaUserPlus className="mr-2 h-4 w-4" />
                          Get Started
                        </MobileNavLink>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children, className }) {
  return (
    <Link href={href} passHref>
      <motion.span
        className={`text-base font-medium text-foreground hover:text-primary transition-colors py-2 ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link href={href} passHref>
      <motion.span
        className="py-3 px-4 flex items-center text-base font-medium hover:bg-primary/10 rounded-lg transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {children}
      </motion.span>
    </Link>
  );
}