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
} from "lucide-react"; // Added FileText icon
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
import DownArrow from "@/../public/svgs/down";
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
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setLoadingAuth(true);
      const { token } = getAuthCookies();
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          console.log("User data fetched successfully:", userData);
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
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className="relative z-20 flex items-center max-w-[7xl] justify-between px-4 py-6 md:px-8 lg:px-12 bg-white bg-opacity-80 backdrop-blur-sm shadow-sm h-[102px]"
    >
      <div className="flex items-center">
        <Link
          href="/"
          className="text-[30px] tracking-tight flex items-center font-plus-jakarta-sans font-bold"
          prefetch={false}
        >
          VENDR <span className="text-primary pl-1">OS</span>
        </Link>
      </div>
      <nav className="hidden lg:flex items-center space-x-20 bg-[#E2C9FA3D] py-[20px] px-[40px] rounded-[50px] ">
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
              <motion.button className="flex items-center text-base font-semibold text-black hover:text-primary transition-colors">
                Assets{" "}
                <span className="ml-1">
                  <DownArrow
                    fill={!isAssetsDropdownOpen ? "#000000" : "#793ee5"}
                  />
                </span>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link
                  href="/assets/procurement-inbox"
                  className="block w-full py-2 font-semibold  font-poppins"
                  prefetch={false}
                >
                  Procurement Inbox
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/assets/contract-execution-suite"
                  className="block w-full py-2 font-semibold font-poppins"
                  prefetch={false}
                >
                  Contract Execution Suite
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/assets/vendr-os-premium"
                  className="block w-full py-2 font-semibold font-poppins"
                  prefetch={false}
                >
                  VENDR OS Premium
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/smartbid-ai"
                  className="block w-full py-2 font-semibold font-poppins"
                  prefetch={false}
                >
                  Smartbid AI
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {!user?.tier && <NavLink href="/pricing">Pricing</NavLink>}
        <NavLink href="/contact">Contact Us</NavLink>
        {isAuthenticated && user?.tier && (
          <NavLink href="/content" className="flex items-center bg-red-500">
            <FileText className="mr-1 h-4 w-4" /> <p>My Content</p>
          </NavLink>
        )}
      </nav>
      {loadingAuth ? (
        <div className="hidden md:flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
        </div>
      ) : isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hidden md:flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5"
            >
              <User className="mr-2 h-5 w-5" />
              {user?.username || "Profile"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              <span>{user?.email || "User"}</span>
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
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link
            href={"/register"}
            className="hidden md:flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5"
          >
            <FaUserPlus className="mr-2 h-5 w-5" />
            Register
          </Link>
          <Link
            href={"/login"}
            className="hidden md:flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5"
          >
            <FaUnlockAlt className="mr-2 h-5 w-5" />
            Login
          </Link>
        </>
      )}

      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-primary"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-xs bg-white p-6 shadow-lg rounded-l-lg"
          >
            <div className="flex justify-between items-center mb-8">
              <Link
                href="/"
                className="text-[30px] tracking-tight flex items-center font-plus-jakarta-sans font-bold"
                prefetch={false}
              >
                VENDR <span className="text-primary pl-1">OS</span>
              </Link>
            </div>
            <nav className="flex flex-col space-y-2">
              <MobileNavLink
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </MobileNavLink>
              <Collapsible
                open={isAssetsOpen}
                onOpenChange={setIsAssetsOpen}
                className="w-full"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-lg font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-lg transition-colors">
                  Assets{" "}
                  <ChevronDown
                    className={`ml-2 h-5 w-5 transition-transform ${
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
                  <MobileNavLink
                    href="/smartbid-ai"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Smartbid AI
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
                Contact Us
              </MobileNavLink>
              {isAuthenticated && user?.tier && (
                <MobileNavLink
                  href="/content"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" /> My Content
                </MobileNavLink>
              )}
              {loadingAuth ? (
                <div className="flex items-center justify-center py-3 px-4 text-base font-medium text-gray-700">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </div>
              ) : isAuthenticated ? (
                <>
                  <MobileNavLink
                    href="#"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </MobileNavLink>
                </>
              ) : (
                <>
                  <MobileNavLink
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserPlus className="mr-2 h-4 w-4" /> Register
                  </MobileNavLink>
                  <MobileNavLink
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUnlockAlt className="mr-2 h-4 w-4" /> Login
                  </MobileNavLink>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href} passHref>
      <motion.span className="flex items-center font-poppins text-base text-black font-semibold hover:text-primary transition-colors ">
        {children}
      </motion.span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link href={href} passHref>
      <motion.span
        className=" py-3 px-4 flex items-center text-base font-medium text-black hover:bg-purple-100 hover:text-primary rounded-lg transition-colors font-poppins"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {children}
      </motion.span>
    </Link>
  );
}
